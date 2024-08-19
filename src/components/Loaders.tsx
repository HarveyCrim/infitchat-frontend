import { SpinnerDotted } from 'spinners-react';
const Loaders = () => {
  return (
    <div className='h-[calc(100vh-90px)] w-[100vw] flex justify-center'>
        <SpinnerDotted color= {"rgb(248 113 113)"} size = {70}/>
    </div>
  )
}

export default Loaders