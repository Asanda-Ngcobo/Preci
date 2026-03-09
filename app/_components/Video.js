export function Video() {
  return (
    <video
      className=" 
        object-cover
       brightness-70 "
      autoPlay
      muted
      loop
      playsInline
      preload="none"
    >
      <source src="/Prici.mp4" type="video/mp4" />
    </video>
  );
}
