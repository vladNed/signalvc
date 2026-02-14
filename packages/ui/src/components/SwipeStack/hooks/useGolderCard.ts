import { Startup } from "@signalvc/types";


const useGolderCard = () => {
  const isGoldenStartup = (startup: Startup) => {
    // TODO: Replace with actual logic to determine if a startup is "golden"
    return false;
  };

  return { isGoldenStartup };
}
export default useGolderCard;