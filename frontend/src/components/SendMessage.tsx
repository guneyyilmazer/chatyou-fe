import {useRef} from 'react'
const SendMessage = ({socket,room,username}:any) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        if(inputRef.current?.value && username)
        {

            socket.emit("send-msg",username,localStorage.getItem("room"),inputRef.current!.value)
        }
    }
  return (
    <form onSubmit={handleSubmit} className='form-group d-flex justify-content-center'>
        <input className='form-check col-4 py-3 rounded-2' placeholder='Send a message' type="text" ref={inputRef} />
        <button className='btn btn-danger ms-2 rounded-3' type="submit">Send</button>
    </form>
  )
}

export default SendMessage