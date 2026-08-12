export interface ServerIdentity {
  name: "Sparkta";
  stage: "foundation";
}

export const getServerIdentity = (): ServerIdentity => ({
  name: "Sparkta",
  stage: "foundation",
});
