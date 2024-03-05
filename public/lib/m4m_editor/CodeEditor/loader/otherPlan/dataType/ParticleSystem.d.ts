/// <reference types="./src/m4m" />
import { Gradient } from "./Gradient";
import { AnimationCurve1 } from "./AnimationCurve1";
import { AssetBundleFileInfo } from "./AssetBundleFileInfo";
export declare class ParticleSystem extends AssetBundleFileInfo {
    static classType: typeof ParticleSystem;
    main: ParticleMainModule;
    emission: ParticleEmissionModule;
    shape: ParticleShapeModule;
    velocityOverLifetime: ParticleVelocityOverLifetimeModule;
    limitVelocityOverLifetime: ParticleLimitVelocityOverLifetimeModule;
    inheritVelocity: ParticleInheritVelocityModule;
    forceOverLifetime: ParticleVelocityOverLifetimeModule;
    colorOverLifetime: ColorBySpeed;
    colorBySpeed: ColorBySpeed;
    sizeOverLifetime: SizeOverLifetime;
    sizeBySpeed: SizeOverLifetime;
    rotationOverLifetime: SizeOverLifetime;
    rotationBySpeed: SizeOverLifetime;
    noise: Noise;
    textureSheetAnimation: TextureSheetAnimation;
}
declare class ParticleMainModule {
    static classType: typeof ParticleMainModule;
    duration: number;
    loop: boolean;
    prewarm: boolean;
    startDelay: MinMaxCurve;
    startLifetime: MinMaxCurve;
    startSpeed: MinMaxCurve;
    useStartSize3D: boolean;
    useStartRotation3D: boolean;
    startSize: MinMaxCurve;
    startSizeX: MinMaxCurve;
    startSizeY: MinMaxCurve;
    startSizeZ: MinMaxCurve;
    gravityModifier: MinMaxCurve;
    maxParticles: number;
    playOnAwake: boolean;
    randomizeRotationDirection: number;
    scalingMode: number;
    simulationSpace: number;
    simulationSpeed: number;
    startColor: MinMaxGradient;
    startRotation: MinMaxCurve;
    startRotationX: MinMaxCurve;
    startRotationY: MinMaxCurve;
    startRotationZ: MinMaxCurve;
}
declare class MinMaxCurve {
    static classType: typeof MinMaxCurve;
    constant: number;
    constantMax: number;
    constantMin: number;
    curve: AnimationCurve1;
    curveMax: AnimationCurve1;
    curveMin: AnimationCurve1;
    curveMultiplier: number;
    mode: number;
}
declare class MinMaxGradient {
    static classType: typeof MinMaxGradient;
    color: m4m.math.color;
    colorMax: m4m.math.color;
    colorMin: m4m.math.color;
    gradient: Gradient;
    gradientMax: Gradient;
    gradientMin: Gradient;
}
declare class ParticleEmissionModule {
    static classType: typeof ParticleEmissionModule;
    enabled: boolean;
    rateOverDistance: MinMaxCurve;
    rateOverTime: MinMaxCurve;
    bursts: burst[];
}
declare class burst {
    static classType: typeof burst;
    cycleCount: number;
    maxCount: number;
    minCount: number;
    repeatInterval: number;
    time: number;
}
declare class ParticleShapeModule {
    static classType: typeof ParticleShapeModule;
    alignToDirection: boolean;
    angle: number;
    arc: number;
    arcMode: number;
    arcSpeed: MinMaxCurve;
    arcSpread: number;
    box: m4m.math.vector3;
    enabled: boolean;
    length: number;
    radius: number;
    radiusMode: number;
    radiusSpeed: MinMaxCurve;
    radiusSpread: number;
    randomDirectionAmount: number;
    shapeType: number;
    sphericalDirectionAmount: number;
}
declare class ParticleVelocityOverLifetimeModule {
    static classType: typeof ParticleVelocityOverLifetimeModule;
    enabled: boolean;
    space: number;
    x: MinMaxCurve;
    y: MinMaxCurve;
    z: MinMaxCurve;
}
declare class ParticleLimitVelocityOverLifetimeModule {
    static classType: typeof ParticleLimitVelocityOverLifetimeModule;
    dampen: number;
    enabled: boolean;
    limit: MinMaxCurve;
    limitX: MinMaxCurve;
    limitY: MinMaxCurve;
    limitZ: MinMaxCurve;
    separateAxes: boolean;
    space: number;
}
declare class ParticleInheritVelocityModule {
    static classType: typeof ParticleInheritVelocityModule;
    enabled: boolean;
    curve: MinMaxCurve;
    mode: number;
}
declare class ColorBySpeed {
    static classType: typeof ColorBySpeed;
    color: MinMaxGradient;
    enabled: boolean;
    range: m4m.math.vector2;
}
declare class SizeOverLifetime {
    static classType: typeof SizeOverLifetime;
    enabled: boolean;
    range: m4m.math.vector2;
    separateAxes: boolean;
    size: MinMaxCurve;
    x: MinMaxCurve;
    y: MinMaxCurve;
    z: MinMaxCurve;
}
declare class Noise {
    static classType: typeof Noise;
    enabled: boolean;
    damping: boolean;
    frequency: number;
    octaveCount: number;
    octaveMultiplier: number;
    octaveScale: number;
    quality: number;
    remap: MinMaxCurve;
    remapEnabled: boolean;
    remapMultiplier: number;
    remapX: MinMaxCurve;
    remapXMultiplier: number;
    remapY: MinMaxCurve;
    remapYMultiplier: number;
    remapZ: MinMaxCurve;
    remapZMultiplier: number;
    scrollSpeed: MinMaxCurve;
    scrollSpeedMultiplier: number;
    separateAxes: boolean;
    strength: MinMaxCurve;
    strengthMultiplier: number;
    strengthX: MinMaxCurve;
    strengthXMultiplier: number;
    strengthY: MinMaxCurve;
    strengthYMultiplier: number;
    strengthZ: MinMaxCurve;
    strengthZMultiplier: number;
}
declare class TextureSheetAnimation {
    static classType: typeof TextureSheetAnimation;
    animation: number;
    cycleCount: number;
    enabled: boolean;
    flipU: number;
    flipV: number;
    frameOverTime: MinMaxGradient;
    numTilesX: number;
    numTilesY: number;
    rowIndex: number;
    startFrame: MinMaxGradient;
    useRandomRow: boolean;
    uvChannelMask: number;
}
export {};
