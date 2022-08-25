import React, { useState, useEffect, Component } from "react";
import AuthWrapper from "../components/auth/AuthWrapper";
import Form from "react-bootstrap/Form";
import AuthButton from "./../components/auth/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { update, HOST } from "./../redux/store.js";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { render } from "@testing-library/react";

const Finance = () => {
  const curDate = useSelector((state) => state.financeInfo.date);
  const curDeadline = useSelector((state) => state.financeInfo.deadline);
  const curAmmount = useSelector((state) => state.financeInfo.ammount);
  const curCommerce = useSelector((state) => state.financeInfo.commerce);
  const curStatus = useSelector((state) => state.financeInfo.status);

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>계약일</TableCell>
            <TableCell>납부마감일</TableCell>
            <TableCell>금액</TableCell>
            <TableCell>커머스</TableCell>
            <TableCell>납부여부</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableBody>1</TableBody>
            <TableCell>{curDate}</TableCell>
            <TableCell>{curDeadline}</TableCell>
            <TableCell>{curAmmount}</TableCell>
            <TableCell>{curCommerce}</TableCell>
            <TableCell>{curStatus}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Finance;
