import { TextAreaNoBackground } from "@/components/common/TextAreaNoBackground"
import { Button, Modal, ModalBody, ModalContent, Spacer, useDisclosure } from "@nextui-org/react"
import { RiArrowDropDownLine, RiExpandDiagonal2Line, RiImage2Fill, RiMoreFill, RiShareFill, RiStarFill, RiUserSmileFill } from "react-icons/ri"
import { BlockBasedEditor } from "@/components/common/BlockBasedEditor"

export interface CreateNewPageModalProps {
    renderTrigger: ({onOpen, onClose, isOpen}: {
        onOpen: () => void
        onClose: () => void
        isOpen: boolean
    }) => React.ReactNode
}


export const CreateNewPageModal = (props:  CreateNewPageModalProps) => {
    const { renderTrigger }= props
    const { onClose, onOpen, isOpen } = useDisclosure()
    return (
        <>
        {renderTrigger({
            onOpen,
            onClose,
            isOpen
        })}
        <Modal
            size="4xl"
            isOpen={isOpen}
            hideCloseButton
            onOpenChange={open => {
                return open ? onOpen() : onClose()
            }}
            scrollBehavior="outside"
        >
            <ModalContent>
                <ModalBody
                    className="min-h-[80vh] px-3 py-3"
                    role="dialog"
                >
                    <div className="flex items-center mb-3 gap-2">
                        <div className="flex items-center gap-1">
                            <Button isIconOnly size="sm" variant="light">
                                <RiExpandDiagonal2Line size={16}/>
                            </Button>
                        </div>
                        <div className="flex items-center">
                            <Button size="sm" variant="flat"
                            endContent={
                                <RiArrowDropDownLine size={16}/>
                            }
                            >Create New Page</Button>
                        </div>
                        <Spacer className="flex-1" />
                        <div className="flex items-center justify-end">
                            <Button size="sm" variant="light" isIconOnly>
                                <RiShareFill size={16}/>
                            </Button>
                            <Button size="sm" variant="light" isIconOnly>
                                <RiStarFill size={16}/>
                            </Button>
                            <Button size="sm" variant="light" isIconOnly>
                                <RiMoreFill size={16}/>
                            </Button>
                        </div>
                    </div>
                    <div className="px-20">
                        <div className="flex flex-col group">
                            <div className="h-8 group-hover:opacity-100 opacity-0 transition duration-200">
                                <div className="opacity-60 group-hover:flex gap-1 hidden">
                                    <Button startContent={
                                        <RiUserSmileFill size={16}/>
                                    } size="sm" variant="light">Icons</Button>
                                    <Button startContent={
                                        <RiImage2Fill size={16}/>
                                    } size="sm" variant="light">Icons</Button>
                                </div>
                            </div>
                            <TextAreaNoBackground
                                minRows={1}
                                placeholder="Untitled"
                                classNames={{
                                    input: "text-4xl font-bold"
                                }}
                            />
                            <div className="mt-2 pb-10 -mx-3">
                                <BlockBasedEditor/>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}