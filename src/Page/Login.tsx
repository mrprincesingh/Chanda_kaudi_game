import React, { useState } from "react";
import {
  Text,
  SimpleGrid,
  Box,
  Input,
  Checkbox,
  Flex,
  Link,
  Image,
  Alert,
  AlertIcon,
  Grid,
  GridItem,
  useToast,
  Button,
} from "@chakra-ui/react";
import "../styles/Login.css";
import admin from "../Utils/photo.avif";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { stateType } from "../Redux/User/reducer";
import { auth_login } from "../Redux/User/action";
import { useNavigate } from "react-router-dom";

interface Props {
  email: string;
  password: string;
}

const formData: Props = {
  email: "abhayfaldu@gmail.com",
  password: "abhay",
};

const Login = () => {
  // State maintained for Input tags
  const [Form, setForm] = useState<Props>(formData);

  const state: stateType = useSelector((state: any) => state.AuthManager);
  const { isAuth, loading, error } = state;
  console.log(isAuth);

  //Login Success toast
  const toast = useToast({
    title: `Login Successful`,
    status: "success",
    isClosable: true,
    position: "top",
  });

  //Partially filled form
  const partial = useToast({
    title: `Kinldy fill all the detials`,
    status: "warning",
    isClosable: true,
    position: "top",
  });

  //Error Loggin In
  const Error = useToast({
    title: `Error! Wrong Email or Password`,
    status: "error",
    isClosable: true,
    position: "top",
  });

  //Login API call

  const dispatch: any = useDispatch();

  const handleSubmit = () => {
    if (Form.email == "" || Form.password == "") {
      partial();
    } else {
      dispatch(auth_login(Form.email, Form.password));
    }
  };

  const navigate = useNavigate();
  if (isAuth && !error) {
    navigate("/");
  }
  // Change state "form" as per changes in input tags
  return (
    <Flex align="center" justifyContent={"center"} >
      

<Flex w="fit-content"
     flexDirection={["column","column","row","row"]} gap={["10px","10px","100px","200px"]} p="10" >

<Box   >
          <Image src={admin} w="100%" h={["300px","300px","80%","100%"]} alt="game" borderRadius={20}/>
        </Box>
<Box className="formbox" >
          <Text fontSize={"2xl"} fontWeight={"bold"} marginBottom={"15px"}>
            LOG INTO YOUR ACCOUNT
          </Text>
          <form>
            <Text className="Tags">
              Email Address <span style={{ color: "red" }}>*</span>
            </Text>
            <Input
              placeholder="Enter Email address here"
              className="ipbox"
              type={"email"}
              name="email"
              value={Form.email}
              onChange={(e) =>
                setForm({ ...Form, [e.target.name]: e.target.value })
              }
            />
            <Text className="Tags">
              Password <span style={{ color: "red" }}>*</span>
            </Text>
            <Input
              placeholder="Enter Password here"
              className="ipbox"
              type={"password"}
              name="password"
              value={Form.password}
              onChange={(e) =>
                setForm({ ...Form, [e.target.name]: e.target.value })
              }
            />
            <Flex className="forgot">
              <Checkbox defaultChecked colorScheme={"red"}>
                Remember Me
              </Checkbox>
              <Link color="red.600">Forgot Password ?</Link>
            </Flex>

          
            <Button
              bg="red.600"
              className="submit"
              onClick={handleSubmit}
              isLoading={loading}
            >
              Submit
            </Button>
          </form>
        </Box>







</Flex>





    </Flex>
  );
};

export default Login;
