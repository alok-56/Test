

/*export const columns:ColumnType<ExpandedEmployeeDetails>[]=[
    {
        width={width},
        title="Client Name"
        dataIndex={["subDetails", "clientName"]}
        key="clientName"
        ellipsis={{ showTitle: false }}
        render={(clientName: any) => (
          <Tooltip placement="topLeft" title={clientName}>
            {clientName}
          </Tooltip>
        )}
      },
      
      
      {
        title: "Created Date",
        dataIndex: ["metaInfo","createdDate"],
        
        width: 75,
        ellipsis: {
          showTitle: false,
        },
        render: (text: any, record: ExpandedEmployeeDetails, index: number) => (
          <Tooltip placement="topLeft" title={record.subDetails.clientName}>
            {record.subDetails.clientName}
          </Tooltip>
        ),
      },
      {
        title: "Updated Date",
        dataIndex: ["metaInfo","updatedDate"],
        key: ["metaInfo","updatedDate"],
        width: 75,
        ellipsis: {
          showTitle: false,
        },
        render: (updatedDate: any) => (
          <Tooltip placement="topLeft" title={updatedDate}>
            {updatedDate}
          </Tooltip>
        ),
      },
      {
        title: "Client Name",
        dataIndex: ["subDetails","clientName"],
        key: ["subDetails","clientName"],
        width: 75,
        ellipsis: {
          showTitle: false,
        },
        render: (clientName: any) => (
          <Tooltip placement="topLeft" title={clientName}>
            {clientName}
          </Tooltip>
        ),
      },
      {
        title: "Implement Partner",
        dataIndex: ["subDetails","ipartner"],
        key: ["subDetails","ipartner"],
        width: 100,
        ellipsis: {
          showTitle: false,
        },
        render: (ipartner: any) => (
          <Tooltip placement="topLeft" title={ipartner}>
            {ipartner}
          </Tooltip>
        ),
      },
      {
        title: "Prime Vendor Name",
        dataIndex: ["subDetails","primeVendor","name"],
        key: ["subDetails","primeVendor","name"],
        width: 110,
        ellipsis: {
          showTitle: false,
        },
        render: (name: any) => (
          <Tooltip placement="topLeft" title={name}>
            {name}
          </Tooltip>
        ),
      },
      {
        title: "Prime Vendor Recruiter Name",
        dataIndex: ["subDetails","primeVendor","recruiter","name"],
        key:  ["subDetails","primeVendor","recruiter","name"],
        width: 110,
        ellipsis: {
          showTitle: false,
        },
        render: (name: any) => (
          <Tooltip placement="topLeft" title={name}>
            {name}
          </Tooltip>
        ),
      },
      {
        title: "Prime Vendor Recruiter contact Number",
        dataIndex: ["subDetails","primeVendor","recruiter","contact"],
        key: ["subDetails","primeVendor","recruiter","contact"],
        width: 110,
        ellipsis: {
          showTitle: false,
        },
        render: (contact: any) => (
          <Tooltip placement="topLeft" title={contact}>
            {contact}
          </Tooltip>
        ),
      },
      {
        title: "Prime Vendor Recruiter Email",
        dataIndex: ["subDetails","primeVendor","recruiter","email"],
        key: ["subDetails","primeVendor","recruiter","email"],
        ellipsis: {
          showTitle: false,
        },
        width: 110,
        render: (email: any) => (
          <Tooltip placement="topLeft" title={email}>
            {email}
          </Tooltip>
        ),
      },
      {
        title: "Vendor Name",
        dataIndex: ["subDetails","vendor","name"],
        key: ["subDetails","vendor","name"],
        width: 80,
        ellipsis: {
          showTitle: false,
        },
        render: (name: any) => (
          <Tooltip placement="topLeft" title={name}>
            {name}
          </Tooltip>
        ),
      },
      {
        title: "Vendor Recruiter Name",
        dataIndex: ["subDetails","vendor","recruiter","name"],
        key: ["subDetails","vendor","recruiter","name"],
        width: 100,
        ellipsis: {
          showTitle: false,
        },
        render: (name: any) => (
          <Tooltip placement="topLeft" title={name}>
            {name}
          </Tooltip>
        ),
      },
      {
        title: "Vendor Recruiter Contact Number",
        dataIndex: ["subDetails","vendor","recruiter","contact"],
        key: ["subDetails","vendor","recruiter","contact"],
        width: 110,
        ellipsis: {
          showTitle: false,
        },
        render: (contact: any) => (
          <Tooltip placement="topLeft" title={contact}>
            {contact}
          </Tooltip>
        ),
      },
      {
        title: "Vendor Recruiter Email",
        dataIndex: ["subDetails","vendor","recruiter","email"],
        key: ["subDetails","vendor","recruiter","email"],
        ellipsis: {
          showTitle: false,
        },
        width: 110,
        render: (email: any) => (
          <Tooltip placement="topLeft" title={email}>
            {email}
          </Tooltip>
        ),
      },
      {
        title: "Job Role",
        dataIndex: ["subDetails","job","role"],
        key: ["subDetails","job","role"],
        ellipsis: {
          showTitle: false,
        },
        width: 110,
        render: (role: any) => (
          <Tooltip placement="topLeft" title={role}>
            {role}
          </Tooltip>
        ),
      },
      {
        title: "Job Description",
        dataIndex: ["subDetails","job","description"],
        key: ["subDetails","job","description"],
        ellipsis: {
          showTitle: false,
        },
        width: 110,
        render: (description: any) => (
          <Tooltip placement="topLeft" title={description}>
            {description}
          </Tooltip>
        ),
      },
      {
        title: "Job Work Location",
        dataIndex: ["subDetails","job","workLocation"],
        key: ["subDetails","job","workLocation"],
        ellipsis: {
          showTitle: false,
        },
        width: 110,
        render: (workLocation: any) => (
          <Tooltip placement="topLeft" title={workLocation}>
            {workLocation}
          </Tooltip>
        ),
      },
      {
        title: "Sales Person",
        dataIndex: ["subDetails","salesPerson"],
        key: ["subDetails","salesPerson"],
        width: 80,
        ellipsis: {
          showTitle: false,
        },
        render: (salesPerson: any) => (
          <Tooltip placement="topLeft" title={salesPerson}>
            {salesPerson}
          </Tooltip>
        ),
      },
      {
        title: "Status",
        dataIndex: ["subDetails","status"],
        key: ["subDetails","status"],
        ellipsis: {
          showTitle: false,
        },
        width: 90,
        render: (status: any) => (
          <Tooltip placement="topLeft" title={status}>
            {status}
          </Tooltip>
        ),
      },
      
      {
        title: "Interview Rounds",
        dataIndex: ["subDetails","interviewRounds"],
        key: ["subDetails","interviewRounds"],
        width: 76,
        ellipsis: {
          showTitle: false,
        },
        render: (interviewRounds: any) => (
          <Tooltip placement="topLeft" title={interviewRounds}>
            {interviewRounds}
          </Tooltip>
        ),
      },
      {
        title: "Comments",
        dataIndex: ["subDetails","comments"],
        key: ["subDetails","comments"],
        width: 80,
        ellipsis: {
          showTitle: false,
        },
        render: (comments: any) => (
          <Tooltip placement="topLeft" title={comments}>
            {comments}
          </Tooltip>
        ),
      },
      
]*/