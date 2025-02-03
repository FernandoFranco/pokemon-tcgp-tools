import type { TokenClient } from "@/types/google.type";

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
}

export const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.appdata";

let tokenClient: TokenClient | null = null;
let accessToken: string | null = null;

export function initTokenClient(): void {
  if (!window.google?.accounts?.oauth2) {
    throw new Error("Google OAuth2 API not loaded");
  }

  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
    scope: DRIVE_SCOPE,
    callback: () => {},
  });
}

export async function requestAccessToken(): Promise<string> {
  if (!tokenClient) {
    initTokenClient();
  }

  return new Promise((resolve, reject) => {
    tokenClient!.callback = (response) => {
      if (response.error) {
        reject(response.error);
      } else {
        accessToken = response.access_token!;
        resolve(response.access_token!);
      }
    };
    tokenClient!.requestAccessToken({ prompt: "none" });
  });
}

export async function searchFile(fileName: string): Promise<GoogleDriveFile[]> {
  if (!accessToken) {
    await requestAccessToken();
  }

  const query = encodeURIComponent(`name='${fileName}' and trashed=false`);
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType)`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to search file: ${response.statusText}`);
  }

  const data = await response.json();
  return data.files as GoogleDriveFile[];
}

export async function createFile(fileName: string): Promise<GoogleDriveFile> {
  if (!accessToken) {
    await requestAccessToken();
  }

  const metadata = {
    name: fileName,
    mimeType: "application/json",
  };

  const fileContent = {};

  const boundary = "-------314159265358979323846";
  const delimiter = "\r\n--" + boundary + "\r\n";
  const closeDelimiter = "\r\n--" + boundary + "--";
  const body =
    delimiter +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    "Content-Type: application/json\r\n\r\n" +
    fileContent +
    closeDelimiter;

  const url =
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Failed to create file: ${response.statusText}`);
  }

  return await response.json();
}

export async function getFileContent(fileId: string): Promise<string> {
  if (!accessToken) {
    await requestAccessToken();
  }

  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get file content: ${response.statusText}`);
  }

  return await response.text();
}

export async function updateFile(
  fileId: string,
  newData: string
): Promise<void> {
  if (!accessToken) {
    await requestAccessToken();
  }

  const url = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: newData,
  });

  if (!response.ok) {
    throw new Error(`Failed to update file: ${response.statusText}`);
  }
}
