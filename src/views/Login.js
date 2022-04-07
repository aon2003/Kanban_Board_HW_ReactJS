import {db} from "../db";
import {useContext, useState} from "react";
import {toast} from "react-toastify";
import Title from "../components/Title";
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {useNavigate} from "react-router";
import authContext from "../utils/authContext";
const hash = require('sha1');

const Home = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = useContext(authContext);

    const login = async (e) => {
        e.preventDefault();

        try {
            const user = await db.users.where({username: username}).first()

            if (!user) {
                throw new Error(`User with name '${username}' was not found!`);
            } else if (user.password !== hash(password)) {
                throw new Error("Wrong Password");
            }

            auth.setUsername(username);
            toast.success(`You successfully logged in as '${username}'`);
            navigate('/');
        } catch (error) {
            toast.error(`${error}`)
        }
    }



    return (
        <>
            <Title>Login</Title>

            <Form onSubmit={login}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Username"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-3"
                >
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </FloatingLabel>

                <Button type={'submit'} className="mb-3">
                    Login
                </Button>
            </Form>
        </>
    )
}

export default Home;