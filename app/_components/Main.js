
import MeetPreci from "./_auth_components/MeetPreci"
import Middle from "./Middle"
import Nav from "./Nav"


function Main({data}) {
   
    
    return (
        <div className="
     bg-background font-inter md:w-[85%] w-[90%] mx-auto  ">
       {data ? <Nav data={data}/> : ''} 
        <Middle data={data}/>
       {!data && <MeetPreci/>} 
    
    </div>
    )
}

export default Main
