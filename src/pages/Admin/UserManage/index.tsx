import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {useRef} from 'react';
import {searchUsers} from '@/services/ant-design-pro/api';
import {Image} from 'antd';

const columns: ProColumns<API.CurrentUser>[] = [
	{
		title: '序号',
		dataIndex: 'index',
		valueType: 'indexBorder',
		width: 48,
	},
	{
		title: '用户名',
		dataIndex: 'username',
		copyable: true,
	},
	{
		title: '账号',
		dataIndex: 'userAccount',
		copyable: true,
		hideInSearch: true,
	},
	{
		title: '星球编号',
		dataIndex: 'planetCode',
		copyable: true,
		hideInSearch: true,
	},
	{
		title: '头像',
		dataIndex: 'avatarUrl',
		render: (_, record) => (
			<div>
				<Image src={record.avatarUrl} width={20}/>
			</div>
		),
		hideInSearch: true,
	},
	{
		title: '性别',
		dataIndex: 'gender',
		copyable: true,
		hideInSearch: true,
	},
	{
		title: '电话',
		dataIndex: 'phone',
		copyable: true,
		hideInSearch: true,
	},
	{
		title: '邮箱',
		dataIndex: 'mail',
		copyable: true,
		hideInSearch: true,
	},
	{
		title: '状态',
		dataIndex: 'userState',
		hideInSearch: true,
	},
	{
		title: '角色',
		dataIndex: 'userRole',
		valueType: 'select',
		valueEnum: {
			'0': {text: '普通用户', status: 'Default'},
			'1': {
				text: '管理员',
				status: 'Success'
			},
		},
		hideInSearch: true,
	},
	{
		title: '创建时间',
		dataIndex: 'createTime',
		valueType: 'dateTime',
		hideInSearch: true,
	}
];

export default () => {
	const actionRef = useRef<ActionType>();
	// @ts-ignore
	// @ts-ignore
	return (
		<ProTable<API.CurrentUser>
			columns={columns}
			actionRef={actionRef}
			cardBordered
			request={async (params, sort, filter) => {
				const userList = await searchUsers({params});
				return {
					data: userList
				};
			}}
			editable={{
				type: 'multiple',
			}}
			rowKey="id"
			search={{
				labelWidth: 'auto',
			}}
			pagination={{
				pageSize: 20,
				onChange: (page) => console.log(page),
			}}
			dateFormatter="string"
			headerTitle="用户列表"
		/>
	);
};