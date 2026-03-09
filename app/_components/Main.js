
import Middle from "./Middle"
import Nav from "./Nav"


function Main({data}) {
   
    return (
        <div className="
     bg-background font-inter md:w-[85%] w-[90%] mx-auto  ">
        <Nav
        data={data}/>
        <Middle data={data}/>
    
    </div>
    )
}

export default Main
