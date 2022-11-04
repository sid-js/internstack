import supabaseServer from '../../utils/supabaseServer'
import React from 'react'
import { HomeLayout } from '../../components/HomeLayout'

export const Profile = ({}) => {
  
  return (
    <HomeLayout>
        <div>
            Here is profile
        </div>
    </HomeLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {

    const getProfile = async (username) => {
        const fetchedprofile = await supabaseServer.from("profiles").select("*").eq("username",username).single();
        return fetchedprofile;
    }
    const username = ctx.params?.username; 
    const Profile = await getProfile(username);
    if(Profile){
        return {
            props: {
                Profile,
            }
        }
    
    }
    else if(!Profile && ctx.session.user.username==username){
        return{
            notFound:true
        }
    }
    
}

