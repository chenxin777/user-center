import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {useRef} from 'react';
import {searchUsers} from "@/services/ant-design-pro/api";
import {Image} from "antd";

export const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
};

const columns: ProColumns<API.CurrentUser>[] = [
    {
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
    },
    {
        title: '星球编号',
        dataIndex: 'planetCode',
        copyable: true,
    },
    {
        title: '头像',
        dataIndex: 'avatarUrl',
        render: (_, record) => (
            <div>
                <Image src={record.avatarUrl} width={20}/>
            </div>
        )
    },
    {
        title: '性别',
        dataIndex: 'gender',
        copyable: true,
    },
    {
        title: '电话',
        dataIndex: 'phone',
        copyable: true,
    },
    {
        title: '邮箱',
        dataIndex: 'mail',
        copyable: true,
    },
    {
        title: '状态',
        dataIndex: 'userState'
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
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateTime'
    }
];

export default () => {
    const actionRef = useRef<ActionType>();
    return (
        <ProTable<API.CurrentUser>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params, sort, filter) => {
                console.log(sort, filter);
                const userList = await searchUsers();
                return {
                    data: userList
                }
            }}
            editable={{
                type: 'multiple',
            }}
            columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                defaultValue: {
                    option: {fixed: 'right', disable: true},
                },
                onChange(value) {
                    console.log('value: ', value);
                },
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                syncToUrl: (values, type) => {
                    if (type === 'get') {
                        return {
                            ...values,
                            created_at: [values.startTime, values.endTime],
                        };
                    }
                    return values;
                },
            }}
            pagination={{
                pageSize: 5,
                onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle="高级表格"
        />
    );
};