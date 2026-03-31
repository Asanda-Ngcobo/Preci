
async function Heading({data}) {


  const { full_name, name } = data.user_metadata;

  const Name = full_name || name
    ? full_name || name
        .split('@')[0]
        .replace(/[._]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
    : 'User'

// await supabase.from('profiles').upsert({
//   id: data.claims.sub,
//   email,
//   first_name: firstName,
// })


//  console.log({email, firstName})
    return (
        <div className="  mb-5 w-full flex-col gap-6 mx-auto justify-center">
            <h1 className="text-md   md:text-5xl font-sans text-(--text-secondary)
               font-bold">Hi {Name}
                , </h1>
              <h1 className="text-sm  md:text-2xl font-sans
               font-bold text-(--accent-secondary)  ">
               Your signature is powerful, do not give it away too easy.
                {/* <ContractTypeRotator/> */}
            </h1>
              <h3 className="text-(--text-secondary)
            md:text-xs text-[10px]"> Upload your contract document and get a clear understanding of
              what you committing to, before signing.</h3>
            
            
        </div>
    )
}

export default Heading
