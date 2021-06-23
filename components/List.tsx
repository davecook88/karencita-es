import * as React from "react";
import ListItem from "./ListItem";
import { User } from "../interfaces";
import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

type Props = {
  items: any[];
  type: string;
};

const List = ({ items, type }: Props) => (
  <Table>
    <TableBody>
      {items.map((item, i) => (
        <TableRow key={item._id || i}>
          <TableCell>{item.name}</TableCell>
          <TableCell>
            <Link href={`${type}/${item._id}`}>edit</Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default List;
