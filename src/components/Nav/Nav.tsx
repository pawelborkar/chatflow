import { Button } from "@nextui-org/react"

const Nav = () => {
  return (
    <div className="h-16 w-full px-4 flex justify-end items-center bg-gray-100">
      <div className="w-56 ">
        <Button variant='shadow' color='primary' className="h-10 w-36 text-indigo-500 rounded-md border-2 border-indigo-500 hover:bg-blue-500 hover:text-white"> Save Changes </Button>
      </div>
    </div>
  )
}

export default Nav
