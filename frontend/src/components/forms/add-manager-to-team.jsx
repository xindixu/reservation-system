import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import { Form, Select, List, Avatar } from "antd"
import { TEAM, FORM } from "lib/common-types"
import { getFullName, getDefaultAvatar } from "lib/utils"

import { defaultValidateMessages, defaultFormLayout } from "lib/constants"
import useManagers from "data/use-managers"

const groupManagers = (managers, teamId) => {
  const managersInTeam = []
  const managersNotInTeam = []

  managers.forEach((manager) => {
    if (manager.team.id === teamId) {
      managersInTeam.push(manager)
    } else {
      managersNotInTeam.push(manager)
    }
  })

  return { managersInTeam, managersNotInTeam }
}

const AddManagerToTeam = ({ form, initialTeam, onSubmit, setNumOfManagersToAdd }) => {
  const { t } = useTranslation()
  const { managers: { managers } = {}, loadingManagers, loadManagers } = useManagers()

  useEffect(() => {
    // TODO: real pagination
    loadManagers({ variables: { size: 100 } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loadingManagers) {
    return "loading..."
  }

  const { managersInTeam, managersNotInTeam } = groupManagers(managers, initialTeam.id)

  return (
    <>
      <Form
        {...defaultFormLayout}
        form={form}
        initialValues={initialTeam}
        validateMessages={defaultValidateMessages}
        onFinish={onSubmit}
      >
        <Form.Item
          label={t("message.addManagersToTeam", { team: initialTeam.name })}
          name="managerIds"
        >
          <Select
            mode="multiple"
            onChange={(managerIds) => setNumOfManagersToAdd(managerIds.length)}
          >
            {managersNotInTeam.map((manager) => (
              <Select.Option value={manager.id} key={manager.id}>
                {getFullName(manager)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <p className="capitalize">{t("message.currentManagersInTeam", { team: initialTeam.name })}</p>

      <List
        dataSource={managersInTeam}
        renderItem={(manager) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={getDefaultAvatar(manager, "xs")} />}
              title={getFullName(manager)}
              description={manager.jobTitle}
            />
          </List.Item>
        )}
      />
    </>
  )
}

AddManagerToTeam.propTypes = {
  form: PropTypes.shape(FORM).isRequired,
  initialTeam: PropTypes.shape(TEAM).isRequired,
  onSubmit: PropTypes.func.isRequired,
  setManagersCount: PropTypes.func.isRequired,
  setNumOfManagersToAdd: PropTypes.func.isRequired,
}
export default AddManagerToTeam
