import {Avatar, Flex, Container, Divider} from "@prismane/core";
import "./DesktopMenu.css";
import { useEffect, useState, useRef } from "react";
import { Menu, fr, Button, Switch} from "@prismane/core";
import { Icon } from "@prismane/core";
import { Chat, GearSix, Images, MagnifyingGlass, SignOut, User } from "@phosphor-icons/react";
import { IoMdMenu } from "react-icons/io";
import { CiLight } from "react-icons/ci";


interface MenuProps {
    onClick: (tab: string) => void;
}

function CustomMenu({ onClick }: MenuProps) {
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(false);
  const [status, setStatus] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen1(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Flex direction="column" gap={fr(2)}>
      <Button id="menu" onClick={() => setOpen1(!open1)} >
        <IoMdMenu size={'4vh'} color={"rgb(197, 197, 197)"} />
      </Button>
      <Menu ref={menuRef} w={fr(65)} open={open1} id="menu-body">
        
        <Menu.Item  onClick={() => onClick("Friends")}>
          <Menu.Icon>
            <User />
          </Menu.Icon>
          <label className="item">Друзья</label>
        </Menu.Item>

        <Menu.Item className="item" onClick={() => onClick("Chats")}>
          <Menu.Icon>
            <Chat />
          </Menu.Icon>
          <label className="item">Чаты</label>
        </Menu.Item>

        <Menu.Item className="item" onClick={() => onClick("Light Mode")}>
          <Menu.Icon>
            <CiLight />
          </Menu.Icon>
          <Container id="light_mode">
            <label className="item">Светлая тема</label>
            <Switch value={value} onChange={(e) => setValue(e.target.checked)} />
          </Container>
        </Menu.Item>

        <Menu.Item className="item" onClick={() => onClick("Settings")}>
          <Menu.Icon>
            <GearSix />
          </Menu.Icon>
          <label className="item">Настройки</label>
        </Menu.Item>

        <Menu.Item className="item" color="red" onClick={() => onClick("Log Out")}>
          <Menu.Icon>
            <SignOut color="rgb(255, 109, 109)" />
          </Menu.Icon>
          <label className="item">Выход</label>
        </Menu.Item>
      </Menu>
    </Flex>
  );
}

export default CustomMenu