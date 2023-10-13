<template>
  <div class="card">
    <div class="imgBox">
      <img
        src="https://img2.huashi6.com/images/resource/thumbnail/2022/01/14/4113_7388320628.jpg?imageMogr2/quality/75/interlace/1/thumbnail/700x/gravity/North/crop/700x816/format/jpeg"
        alt=""
      />
    </div>
    <div class="content">
      <div class="details">
        <h2>
          三月七<br />
          <p>冰系</p>
        </h2>
        <div class="data">
          <h3>命途<br /><sub>存护</sub></h3>
          <h3>派系<br /><sub>无名客</sub></h3>
          <h3>所属<br /><sub>星穹列车</sub></h3>
        </div>
        <div class="actionBtn">
          <button>Follow</button>
          <button>Message</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
/* 设置卡片的基本样式 */
.card {
  position: relative;
  width: 350px;
  height: 200px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15);
  transition: 0.5s;
  /* 当鼠标悬停在卡片上时，卡片高度会发生变化 */
  &:hover {
    height: 450px;
    /* 当鼠标悬停在卡片上时，图片框的宽度和高度会发生变化 */
    .imgBox {
      width: 250px;
      height: 250px;
    }
    /* 当鼠标悬停在卡片上时，卡片内容会发生变化 */
    .content {
      .details {
        transform: translateY(0px);
      }
    }
  }
  /* 设置图片框的基本样式 */
  .imgBox {
    position: absolute;
    left: 50%;
    top: -50px;
    transform: translateX(-50%);
    width: 150px;
    height: 150px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);
    overflow: hidden;
    transition: 0.5s;
    /* 设置图片的基本样式 */
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  /* 设置卡片内容的基本样式 */
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    /* 设置卡片内容的详细信息 */
    .details {
      padding: 40px;
      text-align: center;
      width: 100%;
      transition: 0.5s;
      transform: translateY(150px);
      /* 设置卡片内容中标题的样式 */
      h2 {
        font-size: 1.25em;
        font-weight: 600;
        color: #555;
        line-height: 1.2em;
        /* 设置卡片内容中标题下的小段落的样式 */
        p {
          font-size: 0.75em;
          font-weight: 500;
          opacity: 0.5;
        }
      }
      /* 设置卡片内容中详细信息的样式 */
      .data {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
        /* 设置卡片内容中详细信息中每个小标题的样式 */
        h3 {
          width: 80px;
          padding: 0 auto;
          font-size: 1em;
          color: #555;
          line-height: 1.2em;
          font-weight: 600;
          /* 设置卡片内容中详细信息中每个小标题下的小字体的样式 */
          sub {
            font-size: 0.85em;
            font-weight: 400;
            opacity: 0.5;
          }
        }
      }
      /* 设置卡片内容中操作按钮的样式 */
      .actionBtn {
        display: flex;
        justify-content: space-between;
        /* 设置卡片内容中操作按钮的样式 */
        button {
          width: 120px;
          padding: 10px 30px;
          border-radius: 5px;
          border: none;
          outline-style: none;
          font-size: 1em;
          font-weight: 500;
          background: #ff5acd;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
