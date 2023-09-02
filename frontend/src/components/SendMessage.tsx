import {useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImage} from '@fortawesome/free-solid-svg-icons'
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
        <button className='btn btn-danger ms-2 rounded-3' type="submit"><FontAwesomeIcon style={{height:"24px",width:"1.5rem",marginTop:"3px"}} icon={faImage}></FontAwesomeIcon></button>
        <button className='btn btn-danger ms-2 rounded-3' type="submit">Send</button>
    </form>
  )
}

export default SendMessage