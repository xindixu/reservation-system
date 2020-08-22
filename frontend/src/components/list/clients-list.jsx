import React from "react"
import PropTypes from "prop-types"
import { List, Avatar, Spin, Skeleton, Button, Tag } from "antd"
import InfiniteScroll from "react-infinite-scroll-component"
import { MailOutlined, PhoneOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { getFullName } from "lib/utils"

const ClientsList = ({ clients = [], fetchMore, loading, hasNext, editClient, deleteClient }) => {
  return (
    <div id="scrollableDiv" style={{ height: 800, overflow: "auto" }}>
      <InfiniteScroll
        dataLength={clients.length}
        next={fetchMore}
        hasMore={hasNext}
        loader={
          <div className="flex justify-center" key="spinner">
            <Spin />
          </div>
        }
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={clients}
          renderItem={(client) => (
            <List.Item
              key={client.id}
              actions={[
                <Button
                  key={`edit-${client.id}`}
                  size="small"
                  shape="circle"
                  icon={<EditOutlined />}
                  aria-label="edit"
                  onClick={() => editClient(client)}
                />,
                <Button
                  key={`delete-${client.id}`}
                  size="small"
                  type="danger"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  aria-label="delete"
                  onClick={() => deleteClient(client)}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{getFullName(client)}</a>}
                description={client.email}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  )
}
export default ClientsList
