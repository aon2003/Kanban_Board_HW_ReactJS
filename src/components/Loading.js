import {Alert, Spinner} from "react-bootstrap";


const Loading = (props) => {

    return (
        <>
            {
                props.loading ?
                    <div className={'text-center'}>
                        <Spinner animation="border" variant={'primary'} />
                    </div>
                    :
                    <Alert variant={'info'} className={'text-center'}>
                        <Alert.Heading className={'mb-0'}>
                            {
                                props.message ?
                                    <>
                                        {props.message}
                                    </>
                                    :
                                    <>
                                        ERROR
                                    </>
                            }
                        </Alert.Heading>
                    </Alert>
            }
        </>
    )
}

export default Loading;