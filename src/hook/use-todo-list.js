import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const defaultTodoList = [
   /*  {
        id: 1,
        content: "shopping",
        date: dayjs(),
        isSuccess: true,
    },
    {
        id: 2,
        content: "studying",
        date: dayjs(),
        isSuccess: false,
    },
    {
        id: 3,
        content: "playing",
        date: dayjs(),
        isSuccess: true,
    }, */
]

const TODO_LIST_KEY = "todoList"


export const useTodoList = (selectedDate) => {
    const [todoList, setTodoList] = useState(defaultTodoList);
    const [input, setInput] = useState("");


    const saveTodoList = (newTodoList) => {
        setTodoList(newTodoList);
        AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList)); 
        // AsyncStorage.setItem(키, JSON문자열 값): AsyncStorage에서 해당 키에 값을 저장함.
    }


    const addTodo = () => {
        const len = todoList.length;
        const lastId = len === 0 ? 0 : todoList[len-1].id

        const newTodoList = [
            ...todoList,
            {
                id: lastId + 1,
                content: input,
                date: selectedDate,
                isSuccess: false,
            }
        ]
        saveTodoList(newTodoList)
    }
    


    const removeTodo = (todoId) => {
        const newTodoList = todoList.filter(todo => todo.id !== todoId);
        saveTodoList(newTodoList) 
    }


    const toggleTodo = (todoId) => {
        const newTodoList = todoList.map(todo => {
            if (todo.id !== todoId) return todo;
            return {
                ...todo,
                isSuccess: !todo.isSuccess,
            }   
        });
        saveTodoList(newTodoList)
    }


    const resetInput = () => setInput("");


    const filteredTodoList = todoList.filter(todo => {
        const isSameDate = dayjs(todo.date).isSame(selectedDate, 'date');
        return isSameDate;
    })



    useEffect(()=> {
        init();
    }, []);

    const init = async() => {
        const result = await AsyncStorage.getItem(TODO_LIST_KEY);
        // AsyncStorage.getItem(키): AsyncStorage에서 해당 키에 저장된 값을 가져옴.
        if(result) {
            const newTodoList = JSON.parse(result);
            setTodoList(newTodoList)
        }
    }


    return {
        filteredTodoList,
        todoList,
        addTodo,
        removeTodo,
        toggleTodo,
        input,
        setInput,
        resetInput
    }
}