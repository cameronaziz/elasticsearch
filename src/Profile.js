import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core';

const Profile = (props) => {
  const { person } = props
  console.log(person)

  return (
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Account Number</TableCell>
              <TableCell>{person.account_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{person.firstname} {person.lastname}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Balance</TableCell>
              <TableCell>${person.balance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{person.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>{person.address}, {person.city}, {person.state}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
  )
}

export default Profile
