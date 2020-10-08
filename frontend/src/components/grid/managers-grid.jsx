import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { useInView } from "react-intersection-observer"
import { Typography, Card } from "antd"
import { MANAGER } from "lib/common-types"
import { getDefaultAvatar, getFullName } from "lib/utils"

const { Meta } = Card
const { Paragraph } = Typography

const ManagersGrid = ({ managers = [], fetchMore, hasNext, loading }) => {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNext && !loading) {
      fetchMore()
    }
  }, [inView, fetchMore, hasNext, loading])

  return (
    <div className="flex flex-wrap -mx-2 overflow-hidden">
      {managers.map((manager) => {
        const { id, jobTitle } = manager
        return (
          <Link
            key={id}
            to={`/manager/${id}`}
            className="my-2 px-2 w-1/2 overflow-hidden sm:w-1/2 md:w-1/4 lg:w-1/6"
          >
            <Card
              cover={<img alt={getFullName(manager)} src={getDefaultAvatar(manager, "md")} />}
              // hoverable
            >
              <Meta
                title={getFullName(manager)}
                description={<Paragraph ellipsis>{jobTitle}</Paragraph>}
              />
            </Card>
          </Link>
        )
      })}
      {hasNext && <div ref={ref}>Loader...</div>}
    </div>
  )
}

ManagersGrid.propTypes = {
  managers: PropTypes.arrayOf(PropTypes.shape(MANAGER).isRequired).isRequired,
  fetchMore: PropTypes.func.isRequired,
  hasNext: PropTypes.bool.isRequired,
}

export default ManagersGrid
