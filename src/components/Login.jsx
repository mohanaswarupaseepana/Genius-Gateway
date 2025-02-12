const Login = () => {
    return (
        <div className="bg-blue-200 h-screen flex justify-center items-center bg-[url('/Geniusgateway.png')] bg-cover bg-center " >
            <div className="h-[70%]  w-1/4 flex flex-col justify-center items-center backdrop-blur-sm ml-[50%] ">
                <div className=" h-[20%] mb-4 ">


                    <p className="text-3xl p-3.5 flex justify-center font-bold text-white  ">Login To Genius Gateway</p>
                </div>
                <div className="flex flex-col p-4 w-80 rounded-lg justify-center items-center  h-[50%] size-">
                
                  <input type="email"  placeholder="Email" className="p-3 border m-2 w-full rounded-sm text-white "  required/>
                  <input type="password"  placeholder="Password" className="p-3 border m-2 w-full rounded-sm text-white" required/>
                  <button type="submit" className=" w-3/5 mt-4 rounded-lg    text-white flex justify-center  p-2 bg-blue-800 hover:bg-green-700 transition">Login</button>
                </div>
            </div>
        </div>
    )
}
export default Login;