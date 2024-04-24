import { useDispatch, useSelector } from 'react-redux'
import { clearNotification, getNotification } from '../store/taskSlice'
import { Notifier } from '../components/Notifier'

export const NotifierContainer = () => {
  const dispatch = useDispatch()
  const notification = useSelector(getNotification)

  const handleNotifierClose = () => {
    dispatch(clearNotification())
  }

  return (
    <Notifier
      open={Boolean(notification.length)}
      task={notification}
      onClose={handleNotifierClose}
    />
  )
}
