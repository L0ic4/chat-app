"use client";

import { Sidebar } from "flowbite-react";

export const SideBar = () => {
  return (
    <Sidebar className="flex-initial">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/profile">
            <p>Profile</p>
          </Sidebar.Item>
          <Sidebar.Collapse label="Users">
            <Sidebar.Item href="#">Sales</Sidebar.Item>
            <Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse label="Channels">
            <Sidebar.Item href="#">Sales</Sidebar.Item>
            <Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="#">
            <p>Log-Out</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
