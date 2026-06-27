import MeetPreci from "./_auth_components/MeetPreci";
import Middle from "./Middle";
import Nav from "./Nav";

function Main({ data, params }) {
  return (
    <div className="bg-background font-inter md:w-[85%] w-[90%] mx-auto">
      {/* ✅ null instead of empty string */}
      {data ? <Nav data={data} /> : null}
      <Middle data={data} params={params} />
      {!data && <MeetPreci />}
    </div>
  );
}

export default Main;