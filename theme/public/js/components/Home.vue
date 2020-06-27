<template>
  <div class="custom-main-content-container">
    <div class="customized-link">
      <a class="btn-show-hide text-muted text-medium">
			Customized your dashboard
		</a>
    </div>
    <div class="top-row">
      <div class="top-row-item">
        <div class="overview-section">
          <div class="overview-item">
            <p class="title">Accounting</p>
            <div>
              <p>2930 SAR</p>
              <div class="mini-color-card">
                <p class="rate">60%</p>
                <p class="note">last year</p>
              </div>
            </div>
          </div>
          <div class="overview-item">
            <p class="title">Vacations balance </p>
            <div>
              <p>034 Days</p>
            </div>
          </div>
          <div class="overview-item">
            <p class="title">Total Tasks</p>
            <div>
              <p>120 Task</p>
              <div class="mini-color-card">
                <p class="rate">60%</p>
                <p class="note">Due Task</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="top-row-item">
        <div class="chart-div">

        </div>
      </div>
      <div class="top-row-item">
        <div class="chart-div">

        </div>
      </div>
      <div class="top-row-item">
        <div class="social-icon-container">
          <span class="social-icon">
            <a href="#"><img src="/assets/theme/img/gmail.png" alt="gmail"></a>
          </span>
          <span class="social-icon">
            <a href="#"><img src="/assets/theme/img/git.png" alt="git"></a>
          </span>
          <span class="social-icon">
            <a href="#"><img src="/assets/theme/img/slack.png" alt="slack"></a>
          </span>
          <span class="social-icon">
            <a href="#"><img src="/assets/theme/img/Teams.png" alt="Teams"></a>
          </span>
          <span class="social-icon">
            <a href="#"><img src="/assets/theme/img/drive.png" alt="drive"></a>
          </span>
          <span class="social-icon">
            <a href="#"><img src="/assets/theme/img/Image10.png" alt="Image10"></a>
          </span>
          <span class="social-icon">
            <a href="#"><img src="/assets/theme/img/Image11.png" alt="Image11"></a>
          </span>
          <span class="social-icon">
            <a href="#"><img src="/assets/theme/img/Image12.png" alt="Image12"></a>
          </span>
          <span class="social-icon">
            <a href="#"><img src="/assets/theme/img/Image11.png" alt="Image11"></a>
          </span>
          <span class="social-icon">
            <a href="#"><img src="/assets/theme/img/Image12.png" alt="Image12"></a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .custom-main-content-container {
    word-break: break-word;
    padding-top: 55px;
  }
  div.customized-link {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 5px;
  }
  div.customized-link a {
    text-decoration: underline;
    font-size: 12px;
    font-family: 'Neo Sans Arabic Regular';
    color: #A7A7A7;
  }
  .top-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 210px;
  }
  .top-row .top-row-item {
    background-color: #FFF;
    border-radius: 5px;
    padding: 10px;
    height: 100%;
    margin-bottom: 20px;
  }
  .top-row-item .overview-section {
    width: 195px;
  }
  .top-row-item .social-icon-container {
    width: 83px;
  }
  .top-row-item .chart-div {
    width: 310px;
  }
  .social-icon-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .social-icon-container a {
    width: 30px;
    height: 30px;
    border: 1px solid #ED8718;
    border-radius: 100%;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span.social-icon img {
    width: 70%;
    object-fit: contain;
  }
</style>