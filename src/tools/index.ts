export const alertOptions: any = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export function getAverageColorFromImage(imageUrl: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData?.data;
      let red = 0,
        green = 0,
        blue = 0,
        alpha = 0;
      if (data) {
        for (let i = 0; i < data.length; i += 4) {
          red += data[i];
          green += data[i + 1];
          blue += data[i + 2];
          alpha += data[i + 3];
        }
        const pixelCount = data.length / 4;
        const averageRed = red / pixelCount;
        const averageGreen = green / pixelCount;
        const averageBlue = blue / pixelCount;
        const averageAlpha = alpha / pixelCount;
        const averageColor = {
          red: averageRed,
          green: averageGreen,
          blue: averageBlue,
          alpha: averageAlpha,
        };
        resolve(averageColor);
      }
    };
    img.onerror = reject;
  });
}

export interface IColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export function colorToRgba(color: IColor): string {
  const { red, green, blue, alpha } = color;
  return `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
}

export function createGradient(startColor: string, endColor: string): string {
  return `linear-gradient(to bottom, ${startColor}, ${endColor})`;
}

export function durationToHM(dur: string): string {
  const totalM = parseInt(dur, 10);
  const h = Math.floor(totalM / 60);
  const m = totalM % 60;
  return `${h}h ${m}m`;
}

export function fullDateToYear(date: string): string {
  const d = new Date(date);
  const y = d.getFullYear();
  return y.toString();
}
