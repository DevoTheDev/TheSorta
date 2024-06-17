import { useAPI } from '../contexts/useAPI';

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ControlProps {
    url: string,
    body: BodyInit | { [key: string]: any },
    headers: HeadersInit
}

const useAPIController = () => {
    const { 
        handleGet,
        baseUrl,
        handlePost,
        handlePut,
        handleDelete 
    } = useAPI();

    const Get = (props: Partial<ControlProps>) => {
       return handleGet({ 
        url: props.url, 
        headers: props.headers
     });
    };

    const Post = async (props: Partial<ControlProps>) => {
        return handlePost({ 
            url: props.url, 
            body: props.body,
            headers: props.headers
        })
    };

    const Put = async (props: Partial<ControlProps>) => {
        return handlePut({ 
            url: props.url,
            body: props.body,
            headers: props.headers 
        })
    };

    const Delete = async (props: Partial<ControlProps>) => {
        return handleDelete({
            url: props.url,
        })
    };

    return {
        Get,
        Post,
        Put,
        Delete,
    };
};

export default useAPIController;
