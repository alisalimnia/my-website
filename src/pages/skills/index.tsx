import { Layers } from 'react-huge-icons/outline';
import SingleSkill from 'DOMAIN/SkillsSlider/SingleSkill';
import GetSkillsRequest from 'SERVICES/skills/GetSkills';
import { SkillsResponseDataItem } from 'TYPES/pages/Pages';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Skills() {
    const [skillsList, setSkillsList] = useState<SkillsResponseDataItem[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetSkillsRequest();
                setSkillsList(data?.data || []);
            } catch (error) {
                console.error('خطا در دریافت مهارت‌ها:', error);
                setSkillsList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Head>
                <title>مهارت های توسعه دهنده فرانت اند | علی سلیم نیا</title>
                <meta
                    name='description'
                    content='مهارت های علی سلیم نیا، توسعه دهنده فرانت اند دور کار'
                />
                <link
                    rel='canonical'
                    href='https://alisalimnia.github.io/skills'
                />
                <meta
                    property='og:title'
                    content='مهارت های توسعه دهنده فرانت اند | علی سلیم نیا'
                    key='title'
                />
                <meta
                    property='og:description'
                    content='مهارت های علی سلیم نیا، توسعه دهنده فرانت اند دور کار'
                />
                <meta
                    property='twitter:title'
                    content='مهارت های توسعه دهنده فرانت اند | علی سلیم نیا'
                />
                <meta
                    property='twitter:description'
                    content='مهارت های علی سلیم نیا، توسعه دهنده فرانت اند دور کار'
                />
            </Head>

            <div className='container flex flex-col gap-10'>
                <div className='flex items-center gap-3'>
                    <Layers className='w-10 h-10 text-primary' />
                    <h1 className='font-semibold text-xl'>مهارت ها</h1>
                </div>

                {loading ? (
                    <div className='text-center'>در حال بارگذاری...</div>
                ) : skillsList && skillsList.length > 0 ? (
                    <div className='flex flex-wrap'>
                        {skillsList.map(({ id, attributes }: SkillsResponseDataItem) => (
                            <div
                                key={id}
                                className='!h-auto flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3'>
                                <div className='!h-auto w-full bg-black/10 backdrop-blur border border-gray-500/50 py-5 px-7 leading-10 rounded-lg select-none'>
                                    <SingleSkill dataSkille={attributes} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='!h-auto bg-black/10 backdrop-blur border border-gray-500/50 py-5 px-7 leading-10 rounded-lg select-none text-center'>
                        <p>مهارتی یافت نشد :(</p>
                    </div>
                )}
            </div>
        </>
    );
}
