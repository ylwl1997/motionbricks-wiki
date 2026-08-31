// Single source of truth for every fact on the site.
// Sources: official project page, official mb README snapshot, GR00T-WBC parent README, arXiv.
// Never edit a number here without re-checking the source.

export const OFFICIAL = {
  projectPage: "https://nvlabs.github.io/motionbricks/",
  repo: "https://github.com/NVlabs/GR00T-WholeBodyControl/tree/main/motionbricks",
  parentRepo: "https://github.com/NVlabs/GR00T-WholeBodyControl",
  paperPdf: "https://research.nvidia.com/labs/gear/motionbricks/pdfs/motionbricks_siggraph_2026.pdf",
  arxiv: "https://arxiv.org/abs/2604.24833",
  doi: "https://doi.org/10.1145/3811334",
  demo4k: "https://research.nvidia.com/labs/gear/motionbricks/videos/aibm_runtime_main_demo_latest_art_v3.mp4",
  motionReprDocs: "https://github.com/NVlabs/GR00T-WholeBodyControl/blob/main/motionbricks/docs/motion_representation.md",
  customDatasetDocs: "https://github.com/NVlabs/GR00T-WholeBodyControl/blob/main/motionbricks/docs/adding_your_own_dataset.md",
  contact: "gear-wbc@nvidia.com",
};

export const RELATED = {
  kimodoPage: "https://research.nvidia.com/labs/sil/projects/kimodo/",
  kimodoRepo: "https://github.com/nv-tlabs/kimodo",
  sonicPage: "https://nvlabs.github.io/GEAR-SONIC/",
  sonicRepo: "https://github.com/NVlabs/GR00T-WholeBodyControl",
  bonesSeed: "https://huggingface.co/datasets/bones-studio/seed",
  bonesDatasets: "https://bones.studio/datasets",
  somaRetargeter: "https://github.com/NVIDIA/soma-retargeter",
};

// LFS-tracked assets MUST be embedded via media.githubusercontent.com
// (raw.githubusercontent.com returns a 1 KB LFS pointer, verified 2026-08-31).
const MEDIA = "https://media.githubusercontent.com/media/NVlabs/GR00T-WholeBodyControl/main/motionbricks/assets/gifs";
export const GIFS = {
  teaserAnimation: `${MEDIA}/teaser_animation.gif`,
  teaserRobotics: `${MEDIA}/teaser_robotics.gif`,
  locoZombie: `${MEDIA}/loco_zombie.gif`,
  locoInjuredLeg: `${MEDIA}/loco_injured_leg.gif`,
  locoInjuredTorso: `${MEDIA}/loco_injured_torso.gif`,
  locoSkipping: `${MEDIA}/loco_skipping.gif`,
  locoStrafing: `${MEDIA}/loco_strafing.gif`,
  locoCrouchStrafing: `${MEDIA}/loco_crouch_strafing.gif`,
  locoFreestyle: `${MEDIA}/loco_freestyle.gif`,
  locoIdleWalkJogRun: `${MEDIA}/loco_idle_walk_jog_run.gif`,
  objPickupSword: `${MEDIA}/obj_pickup_sword.gif`,
  objFalling: `${MEDIA}/obj_falling.gif`,
  objJumpBench: `${MEDIA}/obj_jump_bench.gif`,
  objSitting: `${MEDIA}/obj_sitting.gif`,
  objInteractiveAuthoring: `${MEDIA}/obj_interactive_authoring.gif`,
  interactiveDemo: `${MEDIA}/interactive_demo.gif`,
  kimodoTeaser: `${MEDIA}/kimodo_teaser.gif`,
  sonicTeaser: `${MEDIA}/sonic_teaser.gif`,
  bonesSeedTeaser: `${MEDIA}/bones_seed_teaser.gif`,
  somaRetargeterTeaser: `${MEDIA}/soma_retargeter_teaser.gif`,
};
export const PROJ_IMAGES = {
  overview: "https://nvlabs.github.io/motionbricks/static/images/teaser_image_motionbricks.jpg",
};

// Verbatim from mb README (281-line snapshot). Commands must never be reworded.
export const CHECKPOINTS = [
  { path: "out/G1-clip.ckpt", size: "~7.5 MB" },
  { path: "out/motionbricks_vqvae/version_1/checkpoints/*.ckpt", size: "~273 MB" },
  { path: "out/motionbricks_pose/version_1/checkpoints/*.ckpt", size: "~1.6 GB" },
  { path: "out/motionbricks_root/version_1/checkpoints/*.ckpt", size: "~391 MB" },
];

export const KEYBINDS_MOVE = [
  ["W", "Move forward"], ["A", "Move left"], ["S", "Move backward"], ["D", "Move right"],
];
export const KEYBINDS_STYLE = [
  ["V", "Slow walk"], ["Z", "Hand crawling"], ["X", "Walk boxing"], ["B", "Elbow crawling"],
  ["R", "Stealth walk"], ["T", "Injured walk"], ["C", "Walk stealth (crouched)"],
  ["E", "Happy dance walk"], ["F", "Zombie walk"], ["G", "Gun walk"], ["Q", "Scared walk"],
];
export const KEYBIND_NOTE = "Crawling modes (Z hand crawling and B elbow crawling) currently do not support side-only directions.";
export const KEY_DEFAULT = "Without pressing a style key, the default locomotion is: idle (no movement keys), walk (WASD pressed).";

export const KNOWN_ISSUES = [
  {
    t: "Linux/X11 only",
    d: "The keyboard key-grab workaround requires X11 (python-xlib). On Wayland, macOS, or Windows, some MuJoCo keyboard shortcuts may conflict with the controller keys. Keep the terminal focused (not the MuJoCo window) as a workaround.",
  },
  {
    t: "PYTORCH_JIT=0 disables key grabs",
    d: "Running with PYTORCH_JIT=0 interferes with the X11 key-grab workaround. If you need PYTORCH_JIT=0, keep the terminal focused instead.",
  },
  {
    t: "Keyboard package differs by OS",
    d: "The pynput package is required for keyboard input on Linux/macOS. On Windows, the keyboard package is used instead.",
  },
];

// Verbatim from GR00T-WBC parent README Model Card.
export const SONIC_MODELS = [
  {
    name: "Default SONIC (original release)",
    lookahead: "10 future frames at 20 ms spacing, approximately 200 ms of reference lookahead",
    use: "Default general-purpose SONIC controller for motion tracking, planning, teleoperation, and compatibility with existing deployments. G1 and teleoperation future-reference observations use step5.",
  },
  {
    name: "Low-latency teleoperation",
    lookahead: "4 future frames at 20 ms spacing, approximately 80 ms of reference lookahead",
    use: "Intended for more responsive whole-body teleoperation and VLA execution. G1 and teleoperation future-reference observations use step1. Use its encoder, decoder, and observation config together.",
    link: "https://huggingface.co/nvidia/GEAR-SONIC/tree/main/low_latency",
  },
  {
    name: "SONIC v1.1",
    lookahead: "10 future frames at 20 ms spacing, approximately 200 ms of reference lookahead",
    use: "Uses robot-heading-normalized target orientation and was trained with wrist-pose augmentation. Intended for heading-stable whole-body teleoperation and SONIC-backed VLA policies that use this controller. G1 and teleoperation future-reference observations use step5; this is not the low-latency model.",
    link: "https://huggingface.co/nvidia/GEAR-SONIC/tree/main/sonic_v1_1",
  },
];
export const SONIC_COMMON = "All three models use the SONIC universal-token controller, produce 64-dimensional latent motion tokens, run the controller at 50 Hz, and support SMPL pose, G1 motion reference, and teleoperation inputs.";
export const SONIC_CAVEAT = "The lookahead values describe the reference horizon presented to the controller. They are not measurements of total end-to-end teleoperation latency, which also includes sensing, networking, preprocessing, and inference.";

export const NEWS_TIMELINE = [
  ["2026-04-27", "MotionBricks preview release — interactive G1 demo, pretrained checkpoints (VQVAE · pose · root), synthetic training code, motion-representation docs, GIF gallery."],
  ["2026-05-07", "GR00T-WBC: end-to-end VLA workflow on G1 (teleop data → Isaac-GR00T N1.7 fine-tune → SONIC deployment)."],
  ["2026-06-16", "GR00T-WBC: low-latency teleoperation checkpoint (4-frame lookahead) + Isaac Teleop Setup docs."],
  ["2026-07-23", "GR00T-WBC: SONIC v1.1 checkpoint (robot-heading-normalized, wrist-pose augmentation)."],
];

export const LICENSE = {
  code: "Apache License 2.0",
  weights: "NVIDIA Open Model License — permits commercial use with attribution, subject to the trustworthy AI requirements.",
};

// Canonical phrasing (official project page sentence, verbatim figures):
// "MotionBricks achieves 15000 FPS and 2 ms latency covering over 350,000 motion skills by a single neural backbone."
export const HEADLINE_STATS = [
  { v: "15,000", unit: "FPS", note: "real-time generation throughput (official: 15000 FPS)" },
  { v: "2", unit: "ms", note: "latency per official project page" },
  { v: "350,000+", unit: "clips", note: "motion clips modeled by a single neural backbone" },
];
export const CORRECTION_5K = "Many community posts repeat a \u201c5,000 FPS\u201d figure. It is wrong: the official project page and README both state 15,000 FPS / 15000 FPS. Cite the paper, not the hype thread.";
export const CORRECTION_350K_15K = "The pair \u201c350,000 / 15,000\u201d that circulates in posts comes from two different axes of the same claim: 350,000+ motion clips in the training corpus (BONES-SEED, 142,220 retargeted G1 trajectories, ~288 hours), and 15,000 FPS runtime generation throughput. Neither number is a dataset size, and 15,000 FPS is not a monitor refresh rate — it is frames of motion the model can synthesize per second.";

export const FAQ_SCHEMA_BASE = "https://motionbricks.wiki";
