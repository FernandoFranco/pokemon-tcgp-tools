interface LoadExternalScript {
  url: string;
  id: string;
}

export function loadExternalScript({
  url,
  id,
}: LoadExternalScript): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    script.id = id;

    script.onerror = reject;
    script.onload = () => {
      resolve();
    };

    document.head.appendChild(script);
  });
}
