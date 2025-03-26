declare module "*.scss" {
    const content: { [className: string]: string };
    export default content;
  }
  
  declare module "*.mp4" {
    const src: string;
    export default src;
  }
  
  declare module "flag-icons/css/flag-icons.min.css";

  declare module "*.svg" {
    const content: string;
    export default content;
  }
  