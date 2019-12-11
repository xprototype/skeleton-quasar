<template>
  <q-layout
    :class="$options.name"
    view="lHh Lpr lFf"
  >
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script type="text/javascript">
export default {
  name: 'AuthLayout'
}
</script>

<style lang="scss" scoped>
  .AuthLayout {
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#094c72+98,01293f+100 */
    background: radial-gradient(ellipse at bottom, #FFFFFF 0%, #FFFFFF 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#094c72', endColorstr='#01293f', GradientType=1);
  }

  @function box-shadow($stars) {
    $bxshadow: ();
    @for $i from 1 to $stars {
      $bxshadow: append($bxshadow, (random(2000) + 0px) (random(2000) + 0px) #fff, comma);
    }
    @return unquote($bxshadow);
  }

  $bxshadow-large: box-shadow(300);
  $bxshadow-medium: box-shadow(500);
  $bxshadow-small: box-shadow(800);

  .stars {
    position: absolute;
  }

  .stars.large {
    height: 3px;
    width: 3px;
    background: transparent;
    box-shadow: $bxshadow-large;
    animation: blink-large 7s infinite;
  }

  .stars.medium {
    height: 2px;
    width: 2px;
    background: transparent;
    box-shadow: $bxshadow-medium;
    animation: blink-medium 5s infinite;
  }

  .stars.small {
    height: 1px;
    width: 1px;
    background: transparent;
    box-shadow: $bxshadow-small;
    animation: blink-small 3s infinite;
  }

  @keyframes blink-large {
    0% {
      box-shadow: $bxshadow-large;
    }
    70% {
      $colors: '#fff', 'transparent';
      $stars: $bxshadow-large;
      @for $i from 1 to length($stars) {
        $star: set-nth(nth($stars, $i), 3, unquote(nth($colors, random(length($colors)))));
        $stars: set-nth($stars, $i, $star);
      }
      box-shadow: $stars;
    }
    100% {
      box-shadow: $bxshadow-large;
    }
  }

  @keyframes blink-medium {
    0% {
      box-shadow: $bxshadow-medium;
    }
    70% {
      $colors: '#fff', 'transparent';
      $stars: $bxshadow-medium;
      @for $i from 1 to length($stars) {
        $star: set-nth(nth($stars, $i), 3, unquote(nth($colors, random(length($colors)))));
        $stars: set-nth($stars, $i, $star);
      }
      box-shadow: $stars;
    }
    100% {
      box-shadow: $bxshadow-medium;
    }
  }

  @keyframes blink-small {
    0% {
      box-shadow: $bxshadow-small;
    }
    70% {
      $colors: '#fff', 'transparent';
      $stars: $bxshadow-small;
      @for $i from 1 to length($stars) {
        $star: set-nth(nth($stars, $i), 3, unquote(nth($colors, random(length($colors)))));
        $stars: set-nth($stars, $i, $star);
      }
      box-shadow: $stars;
    }
    100% {
      box-shadow: $bxshadow-small;
    }
  }
</style>
