import React from 'react';
import './index.css'; // Assume styling is done here
import PlayAllButton from '@/components/PlayAllButton';
import SongTable from '@/components/SongTable';
import { AlbumType, ArtistType } from '@/types/main';
import { RightOutlined } from '@ant-design/icons';
import PlaylistGrid from '@/components/PlaylistGrid';
import { Link } from 'react-router-dom';
import Brief from '@/components/Brief';

const Artist = () => {
  const songs = [
    {
      id: 1,
      title: "天亮以前说再见",
      artist: {
        id: 1,
        name: "四喜丸子",
        cover: "http://p1.music.126.net/3c7YaCWatny_IbeAXlbSsA==/109951169838848417.jpg?param=640y300",
        albumSize: 5,
        musicSize: 20,
        fansSize: 2000,
      } as ArtistType,
      album: {
        id: 101,
        name: "天亮以前说再见",
        cover: "/images/albums/101.jpg",
        songCount: 10,
        releaseDate: "2020-01-01",
      } as AlbumType,
      duration: "03:53",
    },
    {
      id: 2,
      title: "只为你着迷",
      artist: {
        id: 2,
        name: "李秉成",
        cover: "http://p1.music.126.net/3c7YaCWatny_IbeAXlbSsA==/109951169838848417.jpg?param=640y300",
        albumSize: 3,
        musicSize: 15,
        fansSize: 1500,
      } as ArtistType,
      album: {
        id: 102,
        name: "只为你着迷",
        cover: "/images/albums/102.jpg",
        songCount: 12,
        releaseDate: "2021-05-01",
      } as AlbumType,
      duration: "03:53",
    },
    {
      id: 3,
      title: "一点",
      artist: {
        id: 3,
        name: "Muyoi, Pezzi",
        cover: "http://p1.music.126.net/3c7YaCWatny_IbeAXlbSsA==/109951169838848417.jpg?param=640y300",
        albumSize: 2,
        musicSize: 8,
        fansSize: 500,
      } as ArtistType,
      album: {
        id: 103,
        name: "一点",
        cover: "/images/albums/103.jpg",
        songCount: 8,
        releaseDate: "2022-03-15",
      } as AlbumType,
      duration: "03:20",
    },
    {
      id: 4,
      title: "消散对白",
      artist: {
        id: 4,
        name: "丁雪吟",
        cover: "http://p1.music.126.net/3c7YaCWatny_IbeAXlbSsA==/109951169838848417.jpg?param=640y300",
        albumSize: 1,
        musicSize: 5,
        fansSize: 800,
      } as ArtistType,
      album: {
        id: 104,
        name: "消散对白",
        cover: "/images/albums/104.jpg",
        songCount: 7,
        releaseDate: "2020-11-20",
      } as AlbumType,
      duration: "03:31",
    },
    {
      id: 5,
      title: "我的楼兰",
      artist: {
        id: 5,
        name: "云朵",
        cover: "http://p1.music.126.net/3c7YaCWatny_IbeAXlbSsA==/109951169838848417.jpg?param=640y300",
        albumSize: 10,
        musicSize: 50,
        fansSize: 10000,
      } as ArtistType,
      album: {
        id: 105,
        name: "倔强",
        cover: "/images/albums/105.jpg",
        songCount: 15,
        releaseDate: "2018-08-08",
      } as AlbumType,
      duration: "05:27",
    },
  ];

  const playlists = [
    { imageSrc: "http://p2.music.126.net/ijqYBSkbFywbuKagW7EXEg==/109951168991559832.jpg?param=140y140", title: "每日新鲜 30首" },
    { imageSrc: "http://p2.music.126.net/JTNW-w_PteqbHFu7ODUMaw==/109951170139354867.jpg?param=140y140", title: "车载嗨曲", description: "适合节奏控开车听的宝藏歌单" },
    { imageSrc: "http://p2.music.126.net/2rux5LnJey75tm9Md-9D-Q==/2890616070443534.jpg?param=140y140", title: "「古风柔情」岁月不搁数，故人不如初" },
    { imageSrc: "https://p1.music.126.net/6uQ190QNFU7NOg8zYe_X3Q==/3427177761342872.jpg?param=140y140", title: "柔和纯音乐 | 所以你睡着了吗？" },
    { imageSrc: "http://p1.music.126.net/BBvRsuZloQQ4qWCJ7g_tHQ==/109951168829631257.jpg?imageView=1&thumbnail=800y800&enlarge=1%7CimageView=1&watermark&type=1&image=b2JqL3c1bkRrTUtRd3JMRGpEekNtOE9tLzU2NDgxMjQyMzk1LzJiMmIvMjAyNDEwMTQxMTM4MjAveDk5ODE3MzE1NTU1MDA4NTAucG5n&dx=0&dy=0%7Cwatermark&type=1&image=b2JqL3dvbkRsc0tVd3JMQ2xHakNtOEt4LzI3NjEwNDk3MDYyL2VlOTMvOTIxYS82NjE4LzdhMDc5ZDg0NTYyMDAwZmVkZWJmMjVjYjE4NjhkOWEzLnBuZw==&dx=0&dy=0%7CimageView=1&thumbnail=140y140&?param=140y140", title: "劲歌金曲 | 梦回港乐的黄金岁月" },
    { imageSrc: "http://p2.music.126.net/ijqYBSkbFywbuKagW7EXEg==/109951168991559832.jpg?param=140y140", title: "每日新鲜 30首" },
    { imageSrc: "http://p2.music.126.net/JTNW-w_PteqbHFu7ODUMaw==/109951170139354867.jpg?param=140y140", title: "车载嗨曲", description: "适合节奏控开车听的宝藏歌单" },
    { imageSrc: "http://p2.music.126.net/2rux5LnJey75tm9Md-9D-Q==/2890616070443534.jpg?param=140y140", title: "「古风柔情」岁月不搁数，故人不如初" },
    { imageSrc: "https://p1.music.126.net/6uQ190QNFU7NOg8zYe_X3Q==/3427177761342872.jpg?param=140y140", title: "柔和纯音乐 | 所以你睡着了吗？" },
    { imageSrc: "http://p1.music.126.net/BBvRsuZloQQ4qWCJ7g_tHQ==/109951168829631257.jpg?imageView=1&thumbnail=800y800&enlarge=1%7CimageView=1&watermark&type=1&image=b2JqL3c1bkRrTUtRd3JMRGpEekNtOE9tLzU2NDgxMjQyMzk1LzJiMmIvMjAyNDEwMTQxMTM4MjAveDk5ODE3MzE1NTU1MDA4NTAucG5n&dx=0&dy=0%7Cwatermark&type=1&image=b2JqL3dvbkRsc0tVd3JMQ2xHakNtOEt4LzI3NjEwNDk3MDYyL2VlOTMvOTIxYS82NjE4LzdhMDc5ZDg0NTYyMDAwZmVkZWJmMjVjYjE4NjhkOWEzLnBuZw==&dx=0&dy=0%7CimageView=1&thumbnail=140y140&?param=140y140", title: "劲歌金曲 | 梦回港乐的黄金岁月" },
  ];

  const handleCardClick = (title: string) => {
    console.log(`You clicked on playlist: ${title}`);
  };

  return (
    <div className="artist-container">
      <div className="artist-header">
        <img
          className="artist-image"
          src="http://p2.music.126.net/oJorrgJ3IotZUAbZkBMuFw==/109951167771736533.jpg?param=130y130"
          alt="Artist"
        />
        <div className="artist-info">
          <h2>邓紫棋</h2>
          <div className="count">580 关注 · 300w+ 粉丝</div>
          <div className='follow'>
            <button className="follow-button">关注</button>
          </div>
          <Brief style={{marginTop: 20}}> 
            GEM 邓紫棋，中国香港创作型女歌手、词曲创作人。2008年7月10日以16岁之岭出道。同年10月16日发行首张EP《GEM》，取得香港各大乐坛颁奖礼人金奖。201年5月，以19岁之岭在香港红馆举行5场个人演唱会。2012年7月，发行第四张个人专辑《Xposed》，凭借该专辑邓紫惧在2013年获得IFPI香唱片销量大奖全年最高销量女歌手奖、最高销量国语唱片奖，并入围第24届金曲奖最佳国诺女歌手奖。2014年1月，参加湖南卫视《我是歌手第二季》节，获得总决赛亚军。3月31日，获第27届KCA美国儿童选择奖“最受欢迎亚洲艺人”。12月10日，邓紫棋的蜡像入驻香港杜莎夫人蜡像馆。2015年2月18日加2015年中央电视台春节联欢晚会，自弹自唱其自创的歌曲《多远都要在一起》。5月12日，再登福布斯中国名人榜，排名升至第11位。2015年7月，未满4岁便完成80场个人演唱会。截至北京时间2015年11月22日伦敦温布利终站，《G.E.MXXXLve”世界巡回演唱会》已经完成73场。打破之前华语乐坛女歌单轮巡演59场的记录。8月15日，确认加盟中国好声音第四季担任梦想导师。2018年11月4日，受邀参加美国NASA”科学突破奖”颁奖典礼，担任颁奖及表淡宾，演唱个人原创歌曲《光年之外》:11月19日，入选BBC“年度百大女性”举办音乐会的中国音乐人。2016年1月5日，邓紫棋入选《福布斯》“全球30岁以下30位最具潜力杰出音乐人"。2019年12月，推出音乐专辑《摩天动物园》。
          </Brief>
        </div>
      </div>
      <div className="artist-songs">
        <div className='text'>Hot Hits</div>
        <PlayAllButton text={`Play All`} count={20} />        
      </div>
      <SongTable songs={songs}/>
      <Link to={`/artist/${1}/songs`}>
        <div className="show-all-hits">
          Show All
          <RightOutlined style={{color: 'rgb(93,93,93)'}}/>
        </div>
      </Link>
      
      <div className="artist-songs">
        <div className='text'>Hot Albums</div>      
      </div>
      <PlaylistGrid style={{marginTop: 20}} playlists={playlists} onCardClick={handleCardClick} />
    </div>
  );
};

export default Artist;
