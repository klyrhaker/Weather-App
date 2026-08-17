function Footer({ city }: { city: string }) {
  return (
    <>
      <p>{`weather in ${city} today special for you`}</p>
      <h2>@klyrh Weather</h2>
    </>
  );
}
export default Footer;
