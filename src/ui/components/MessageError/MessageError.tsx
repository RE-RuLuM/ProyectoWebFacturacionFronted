interface MessageErrorProps {
  text: string
}

export const MessageError = ({ text }: MessageErrorProps) => {
  return (
    <span className='text-red-500 font-bold text-xs'>{text}</span>
  )
}
