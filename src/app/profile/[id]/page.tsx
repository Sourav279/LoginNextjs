export default function UserProfile({params}:any){
   
    return (
        <div className="text-center">
            <h1 className="text-3xl m-3">Profile Page</h1>
            <hr></hr>
            
            <h1 className="m-3">This is profile page {params.id}</h1>
        </div>
    )
}