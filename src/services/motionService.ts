export interface MotionData {
  alpha: number; // Compass heading (0-360)
  beta: number;  // Tilt front-back
  gamma: number; // Tilt left-right
}

export class MotionService {
  private static instance: MotionService;
  private listeners: ((data: MotionData) => void)[] = [];
  private isListening = false;

  private constructor() {}

  static getInstance() {
    if (!MotionService.instance) {
      MotionService.instance = new MotionService();
    }
    return MotionService.instance;
  }

  async requestPermission(): Promise<boolean> {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        return permission === 'granted';
      } catch (e) {
        console.error("Permission request failed", e);
        return false;
      }
    }
    return true; // Non-iOS devices don't need explicit permission
  }

  startListening(callback: (data: MotionData) => void) {
    this.listeners.push(callback);
    if (!this.isListening) {
      window.addEventListener('deviceorientation', this.handleOrientation, true);
      this.isListening = true;
    }
  }

  stopListening(callback: (data: MotionData) => void) {
    this.listeners = this.listeners.filter(l => l !== callback);
    if (this.listeners.length === 0 && this.isListening) {
      window.removeEventListener('deviceorientation', this.handleOrientation, true);
      this.isListening = false;
    }
  }

  private handleOrientation = (event: DeviceOrientationEvent) => {
    const data: MotionData = {
      alpha: event.alpha || 0,
      beta: event.beta || 0,
      gamma: event.gamma || 0
    };
    
    // Handle iOS absolute heading if available
    if ((event as any).webkitCompassHeading !== undefined) {
      data.alpha = (event as any).webkitCompassHeading;
    }

    this.listeners.forEach(l => l(data));
  };
}

export const calculateQibla = (lat: number, lng: number): number => {
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  const φ1 = lat * (Math.PI / 180);
  const φ2 = KAABA_LAT * (Math.PI / 180);
  const Δλ = (KAABA_LNG - lng) * (Math.PI / 180);

  const y = Math.sin(Δλ);
  const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);
  
  let qibla = Math.atan2(y, x) * (180 / Math.PI);
  return (qibla + 360) % 360;
};
