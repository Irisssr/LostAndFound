<view class="otherPub data-v-3107cf6c"><user-head vue-id="1" userhead="{{userInfo}}" class="data-v-3107cf6c" bind:__l="__l"></user-head><type-tabbar bind:sendtabbar="__e" vue-id="2" data-event-opts="{{[['^sendtabbar',[['getTabbar']]]]}}" class="data-v-3107cf6c" bind:__l="__l"></type-tabbar><view class="pub_goodList data-v-3107cf6c"><block wx:if="{{goods}}"><view class="pub_goodInfo data-v-3107cf6c" animation="{{animationData}}"><block wx:for="{{goods}}" wx:for-item="item" wx:for-index="index" wx:key="index"><good-info vue-id="{{'3-'+index}}" goodMsg="{{item}}" class="data-v-3107cf6c" bind:__l="__l"></good-info></block></view></block><block wx:else><view class="text data-v-3107cf6c">你还没有发布信息</view></block><view hidden="{{!(goods)}}" class="pub_goodCard data-v-3107cf6c" animation="{{animationData2}}"><block wx:for="{{goods}}" wx:for-item="item" wx:for-index="index" wx:key="index"><good-card vue-id="{{'4-'+index}}" cardsList="{{item}}" class="data-v-3107cf6c" bind:__l="__l"></good-card></block></view></view></view>