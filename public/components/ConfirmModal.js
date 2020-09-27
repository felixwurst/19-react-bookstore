import React from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

export default class PopUpModal extends React.Component {
    render() {
        return (
            <Modal isOpen={this.props.show} toggle={this.props.close}>
                <ModalHeader toggle={this.props.close} className={this.props.className}>
                    {this.props.title}
                </ModalHeader>
                <ModalBody>
                    {this.props.children}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.props.delete(this.props.payload)}>
                        Delete
                    </Button>{' '}
                    <Button color="secondary" onClick={this.props.close}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}
