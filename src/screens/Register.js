import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HOST } from "../redux/store";
import styles from "../assets/css/register.module.css";
import { Helmet } from "react-helmet";
import LocationModal from "../components/LocationModal";
import axios from "axios";
import { style } from "@mui/system";

const Register = () => {
  const [redirectionFlag, setRedirectionFlag] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNum: "",
    password: "",
    bank: "",
    account: "",
  });

  const [incData, setIncData] = useState({
    corporateName: "",
    ceo: "",
    corporateNum: "",
  });

  const [LocModalOpen, setLocModalOpen] = useState(false);
  const [Loc1, setLoc1] = useState("");
  const [Loc2, setLoc2] = useState("");
  const setLocFunc = (data) => {
    setLoc1(data);
  };
  const setCloseModal = () => {
    setLocModalOpen(false);
  };

  const [checkEmail, setCheckEmail] = useState(false);

  const optionValue = [
    "국민은행",
    "신한은행",
    "우리은행",
    "하나은행",
    "기업은행",
    "대구은행",
    "부산은행",
    "경남은행",
    "광주은행",
    "전북은행",
    "제주은행",
    "농협은행",
    "산업은행",
    "수협은행",
    "한국씨티",
    "SC제일은행",
    "HSBC",
    "도이치뱅크",
    "BOA",
    "JP모간",
    "중국공상",
    "BNP파리바",
    "우체국",
    "케이뱅크",
    "카카오뱅크",
    "산림조합",
    "신협",
    "중국",
    "중국건설",
    "토스뱅크",
  ];

  // [To password show & hide]
  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  // [check password equal]
  const [checkPw, setCheckPw] = useState("");
  const [pwEqual, setPwEqual] = useState(false);
  useEffect(() => {
    if (userData.password === checkPw && checkPw !== "") {
      setPwEqual(true);
    } else {
      setPwEqual(false);
    }
  }, [checkPw, userData.password]);

  const handleOnChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChange2 = (e) => {
    setIncData({
      ...incData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeLoc1 = (e) => {
    console.log(e.target.value);
    setLoc1(e.target.value);
  };

  const handleOnChangeLoc2 = (e) => {
    console.log(e.target.value);
    setLoc2(e.target.value);
  };

  const handleOnChangeCheckPw = (e) => {
    setCheckPw(e.target.value);
  };

  const handleRegister = () => {
    if (!checkEmail) {
      alert("이메일 중복확인을 해주세요!");
      return;
    }

    if (userData.password === "" || checkPw === "") {
      alert("비밀번호를 확인해주세요!");
      return;
    } else if (userData.password === checkPw) {
      for (const value in userData) {
        if (userData[value] === "") {
          alert("빈 칸을 모두 입력해주세요");
          return;
        }
      }
      for (const value in incData) {
        if (incData[value] === "") {
          alert("빈 칸을 모두 입력해주세요");
          return;
        }
      }

      axios
        .post("https://cms.credot.kr/api/auth/local/register", {
          username: userData.name,
          email: userData.email,
          password: userData.password,
          phoneNum: userData.phoneNum,
          bank: userData.bank,
          account: userData.account,
          corporateName: incData.corporateName,
          ceo: incData.ceo,
          businessLoc: Loc1.trim() + " " + Loc2.trim(),
          corporateNum: incData.corporateNum,
        })
        .then((res) => {
          // Handle success.
          console.log("Well done!");
          console.log("User profile", res.data.user);
          console.log("User token", res.data.jwt);
          setRedirectionFlag(true);
          alert(userData.name + "님 환영합니다. \n 로그인 후 서비스를 이용해주세요.");
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
        });
      // 입력이 끝나고 inputs를 비워주는 역할
      setUserData({
        name: "",
        email: "",
        phoneNum: "",
        password: "",
        bank: "",
        account: "",
      });
    } else {
      alert("비밀번호와 비밀번호 확인 값이 일치하지 않습니다!");
    }
  };

  if (redirectionFlag === true) {
    return <Navigate to="/" />;
  }
  return (
    <main className="container">
      <Helmet>
        <title>회원가입 - 크레닷</title>
        <meta name="description" content="지금 바로 간편 회원가입을 통해 셀러들의 초간편 선정산 서비스, 크레닷(Cre.)을 만나보세요!" />
        <meta name="keywords" content="선정산, 셀러, 이커머스, 크레닷, 자금, 대출" />
      </Helmet>
      <div className="inner">
        <section className={"section-wrap " + styles.registerIntroduceWrap}>
          <div className={styles.inner}>
            <div className={styles.registerIHead}>
              <span className={styles.registerHeadTitle}>회원가입</span>
            </div>
            <div className={styles.registerIBody}>
              <div className={styles.registerFormWrap}>
                <form>
                  <div className={styles.registerInnerSec}>
                    <span className={styles.registerSecHead}>회원 정보</span>
                    <div className={styles.registerInputWrap}>
                      <input type="text" placeholder="이름을 입력해주세요" name="name" onChange={handleOnChange} />
                      <div className={styles.registerEmailInputWrap}>
                        <input
                          className={styles.registerInputEmail}
                          type="text"
                          placeholder="이메일을 입력해주세요"
                          name="email"
                          onChange={handleOnChange}
                        />
                        {/* check-btn 버튼에 active 클래스 추가시 중복확인 버튼 활성화 */}
                        <button
                          className={`${styles.registerCheckBtn} ${styles.active}`}
                          type="button"
                          onClick={() => {
                            if (!userData.email.includes("@")) {
                              alert("이메일 형식을 올바르게 입력해주세요!");
                            } else {
                              fetch("https://cms.credot.kr/api/email-valid/" + userData.email)
                                .then((res) => res.json())
                                .then((res) => {
                                  if (res.isDuplicate) {
                                    alert("중복되는 이메일이 있습니다.");
                                  } else {
                                    setCheckEmail(true);
                                    alert("사용가능한 이메일입니다.");
                                  }
                                });
                            }
                          }}
                        >
                          중복확인
                        </button>
                      </div>
                    </div>
                    <input
                      className={styles.registerInputSol}
                      type="text"
                      placeholder="연락처를 입력해주세요"
                      name="phoneNum"
                      onChange={handleOnChange}
                    />
                    <div className={styles.registerInputWrap}>
                      <div className={styles.registerPasswordWrap}>
                        <input
                          type={passwordShown ? "text" : "password"}
                          className={styles.inputPassword}
                          placeholder="비밀번호를 입력해주세요"
                          name="password"
                          onChange={handleOnChange}
                        />
                        <div onClick={togglePassword} className={passwordShown ? styles.rEyes : `${styles.rEyes} ${styles.visible}`}></div>
                      </div>
                      <div className={pwEqual ? `${styles.registerPasswordWrap} ${styles.passwordCheckInput}` : styles.registerPasswordWrap}>
                        <input type="password" placeholder="비밀번호를 확인해주세요" name="password" onChange={handleOnChangeCheckPw} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.registerInnerSec}>
                    <span className={styles.registerSecHead}>사업자 정보</span>
                    <div className={styles.registerInputWrap}>
                      <input
                        className={styles.registerInput}
                        type="text"
                        placeholder="법인명을 입력해주세요"
                        name="corporateName"
                        onChange={handleOnChange2}
                      />
                      <input className={styles.registerInput} type="text" placeholder="대표명을 입력해주세요" name="ceo" onChange={handleOnChange2} />
                    </div>
                    <div className={styles.registerBusinessInputWrap}>
                      <input
                        className={styles.registerInputBusiness}
                        type="text"
                        placeholder="사업장 소재지를 입력해주세요"
                        name="businessLoc"
                        onChange={handleOnChangeLoc1}
                        value={Loc1}
                      />
                      <button
                        className={`${styles.registerCheckBusinessbtn} ${styles.active}`}
                        type="button"
                        onClick={() => {
                          setLocModalOpen(true);
                        }}
                      >
                        주소검색
                      </button>
                    </div>
                    <input
                      className={styles.registerInputSol}
                      type="text"
                      placeholder="상세주소를 입력해주세요"
                      name="businessLoc"
                      onChange={handleOnChangeLoc2}
                    />
                    <LocationModal open={LocModalOpen} setData={setLocFunc} close={setCloseModal}></LocationModal>
                    <div className={styles.registerBusinessInputWrap}>
                      <input
                        className={styles.registerInputBusiness}
                        type="text"
                        placeholder="사업자등록번호를 입력해주세요"
                        name="corporateNum"
                        onChange={handleOnChange2}
                      />
                      <button
                        className={`${styles.registerCheckBusinessbtn} ${styles.active}`}
                        type="button"
                        onClick={() => {
                          if (!incData.corporateNum.includes("-")) {
                            alert("형식을 올바르게 입력해주세요!");
                          } else {
                            fetch(HOST + "/corpAuth?code=" + incData.corporateNum)
                              .then((response) => response.text())
                              .then((response) => {
                                alert(response);
                              });
                          }
                        }}
                      >
                        인증
                      </button>
                    </div>
                  </div>
                  <div className={styles.registerInnerSec}>
                    <span className={styles.registerSecHead}>정산받을 계좌</span>
                    <select className={styles.registerInputSol} defaultValue="default" name="bank" onChange={handleOnChange}>
                      <option value="default" disabled>
                        정산받을 계좌의 은행을 선택해주세요
                      </option>
                      {(optionValue || []).map((options, idx) => (
                        <option key={idx} value={options}>
                          {options}
                        </option>
                      ))}
                    </select>
                    <input
                      className={styles.registerInputSol}
                      type="text"
                      placeholder="정산받을 계좌번호를 입력해주세요"
                      name="account"
                      onChange={handleOnChange}
                    />
                  </div>
                  {/* login-btn 버튼에 active 클래스 추가시 로그인 버튼 활성화 */}
                  <button
                    className={styles.loginBtn}
                    type="button"
                    onClick={() => {
                      handleRegister();
                    }}
                  >
                    회원 가입하기
                  </button>
                </form>
              </div>
              <button className={styles.registerBackBtn}>
                <Link to="/">메인화면으로 돌아가기</Link>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
