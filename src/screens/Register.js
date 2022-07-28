import React, { Component, useState, useCallback } from 'react';
import AuthWrapper from '../components/auth/AuthWrapper';
import AuthContent from '../components/auth/AuthContent';
import InputWithLabel from './../components/InputWithLabel';
import AuthButton from './../components/auth/AuthButton';
import Combobox from './../components/Combobox';
import RightAlignedLink from './../components/RightAlignedLink';
import { bankList } from "./../data/bankList";
import { Route, Routes, Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector, Provider } from "react-redux";
import { changeName, changeEmail, changePhoneNum, changePassword } from "./../redux/user";
import store from './../store.js';

const Register = () => {
    let [flag, setFlag] = useState(0);
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [phoneNum, setphoneNum] = useState("");
    // const [password, setpassword] = useState("");

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phoneNum: "",
        password: "",
    })

    // const handleOnChange = useCallback( e => {
    //     let copy = [...inputs];
    //     copy = e.target.value
    //     setInputs(copy);
    // },[])
    
    const handleOnChange = (e) => {
    //     // let copy = [...inputs];
    //     // copy = e.target.value
    //     setInputs(
    //         // ...inputs,
    //     );
    }

    // const handleOnChange = (e) => {
    //     const { name, value } = e.target;
    //     setInputs((prevValues) => ({
    //       ...prevValues,
    //       [name]: value,
    //     }));
    //   }

    // const [users, setUsers] = useState([])

    // const handleOnClick = () => {
    //     const { name, email, phoneNum, password } = inputs;
        
    //     // users 배열에 추가할 user 객체
    //     const user = { name, email, phoneNum, password }
        
    //     // spread 연산을 통해서 기존의 값을 복사하고, users State에 추가
    //     setUsers([
    //         ...users,
    //         user
    //     ])
        
    //     // 입력이 끝나고 inputs를 비워주는 역할
    //     setInputs({
    //         name: "",
    //         email: "",
    //         phoneNum: "",
    //         password: "",
    //     })
    // }

    class CustomerInfo extends Component {
        render() {
            return (
                    <AuthWrapper>
                        <AuthContent title="회원가입">
                                <InputWithLabel label="이름" name="name" placeholder=" 이름" onChange={handleOnChange}/>
                                <InputWithLabel label="이메일" name="email" placeholder="  이메일" onChange={handleOnChange}/>
                                <InputWithLabel label="연락처" name="phoneNum" placeholder="  연락처" onChange={handleOnChange}/>
                                <InputWithLabel label="비밀번호" name="password" placeholder="  비밀번호" type="password" onChange={handleOnChange}/>
                                <InputWithLabel label="" name="passwordConfirm" placeholder="  비밀번호 확인" type="password" onChange={handleOnChange}/>
                                <AuthButton onClick={setFlag}>다음</AuthButton>
                                <RightAlignedLink to="/login">로그인</RightAlignedLink>
                        </AuthContent>
                    </AuthWrapper>
            );
        }
    }

    class BankInfo extends Component {
        render() {
            return (
                    <AuthWrapper>
                        <AuthContent title="선정산 받으실 계좌를 입력해주세요">
                            <Combobox label="" placeholder="  은행" items={ bankList } />
                            <InputWithLabel label="" name="account" placeholder="  계좌번호"/>
                        </AuthContent>
                        <AuthButton>회원가입 완료</AuthButton>
                    </AuthWrapper>
            );
        }
    }

    return flag === 0
           ? 
                <CustomerInfo>
                    
                </CustomerInfo>
           : 
                <BankInfo>

                </BankInfo>

}

export default Register;