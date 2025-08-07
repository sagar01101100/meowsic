import ytdl from "@distube/ytdl-core";

export const extractMetaData = async (url: string) => {
  const info = await ytdl.getInfo(url);
  const { videoDetails } = info;

  return {
    title: videoDetails.title,
    videoId: videoDetails.videoId,
    duration: parseInt(videoDetails.lengthSeconds),
    url: `https://www.youtube.com/watch?v=${videoDetails.videoId}`,
  };
};
