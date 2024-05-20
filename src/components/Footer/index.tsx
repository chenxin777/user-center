import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { GITHUB_URL } from '@/constant'

const Footer: React.FC = () => {
  const defaultMessage = '玩物志出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: GITHUB_URL,
          blankTarget: true,
        }
      ]}
    />
  );
};
export default Footer;
