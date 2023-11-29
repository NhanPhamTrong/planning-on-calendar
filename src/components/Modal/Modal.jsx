import "./Modal.scss"
import { AnimatePresence, motion } from "framer-motion"
import { Form } from "../Form/Form"
import { useModal } from "../../contexts/ModalContext"

export const Modal = () => {
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const { chosenTime, CloseModal } = useModal()

    return (
        <AnimatePresence>
            {chosenTime.isActiveModal && (
                <motion.div
                    id="modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="modal-background" onClick={CloseModal}></div>
                    <div className="modal-content">
                        <h1>{monthsOfYear[chosenTime.month - 1] + " " + chosenTime.day + ", " + chosenTime.year}</h1>
                        <Form />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}